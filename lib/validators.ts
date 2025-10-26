import { z } from 'zod';

// Inquiry form validation schema
export const inquirySchema = z
  .object({
    name: z.string().min(1, 'nameRequired'),
    email: z.string().min(1, 'emailRequired').email('emailInvalid'),
    phone: z.string().min(1, 'phoneRequired'),
    guests: z.coerce.number().min(1, 'guestsMin').max(6, 'guestsMax'),
    checkIn: z.string().min(1, 'checkInRequired'),
    checkOut: z.string().min(1, 'checkOutRequired'),
    message: z.string().optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'checkOutAfterCheckIn',
    path: ['checkOut'],
  });

export type InquiryFormData = z.infer<typeof inquirySchema>;

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(1, 'nameRequired'),
  email: z.string().min(1, 'emailRequired').email('emailInvalid'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

