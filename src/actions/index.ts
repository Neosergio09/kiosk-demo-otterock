import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { supabase } from '../lib/supabase';

const COLOR_LABELS: Record<string, string> = {
  white:        'BLANCO',
  black:        'NEGRO',
};

// ── Action ────────────────────────────────────────────────────────────────────
export const server = {
  createPersonalizedOrder: defineAction({
    accept: 'form',
    input: z.object({
      garmentType: z.string().min(1, 'Selecciona una prenda'),
      color:       z.string().min(1, 'Selecciona un color'),
      size:        z.string().min(1, 'Selecciona una talla'),
      customization_data: z.string().min(2, 'Agrega personalización'),
    }),

    handler: async (input, context) => {
      let customizationData;
      try {
        customizationData = JSON.parse(input.customization_data);
      } catch (e) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Datos de personalización inválidos.' });
      }

      const patchesCount = customizationData.patches ? customizationData.patches.length : 0;
      if (patchesCount > 4) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Máximo 4 parches permitidos.' });
      }

      const textContent = customizationData.text || 'Ninguno';

      // ── DB Insert ─────────────────────────────
      const { data: insertedOrder, error: dbError } = await supabase
        .from('orders')
        .insert({
          garment_type: input.garmentType,
          garment_color: input.color,
          size: input.size,
          customization_data: customizationData,
        })
        .select()
        .single();

      if (dbError) {
        console.error('[db insert]', dbError.message);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Error al procesar la orden.' });
      }

      const colorLabel = COLOR_LABELS[input.color] ?? input.color.toUpperCase();

      return {
        success:    true,
        order_id:   insertedOrder.id,
        order: {
          colorLabel,
          size: input.size,
          patchesCount,
          textContent,
        },
      };
    },
  }),
};
