import { z } from 'zod';

// Helper function to convert dd/mm/yyyy to Date object
const parseDate = (dateStr: string): Date => {
  // Check if it's already in ISO format (yyyy-mm-dd)
  if (dateStr.includes('-')) {
    return new Date(dateStr);
  }
  
  // Parse dd/mm/yyyy format
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  
  return new Date(dateStr);
};

// Date format regex: dd/mm/yyyy or dd-mm-yyyy
const dateRegex = /^(\d{2})[/-](\d{2})[/-](\d{4})$/;

// Custom date validation
const isValidDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  
  // Check ISO format (yyyy-mm-dd)
  if (dateStr.includes('-')) {
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    return isoRegex.test(dateStr);
  }
  
  // Check dd/mm/yyyy format
  if (dateRegex.test(dateStr)) {
    const match = dateStr.match(dateRegex);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      
      // Basic validation
      if (day < 1 || day > 31) return false;
      if (month < 1 || month > 12) return false;
      if (year < 1900) return false;
      
      return true;
    }
  }
  
  return false;
};

// Inquiry form validation schema
export const inquirySchema = z
  .object({
    name: z.string().min(1, 'nameRequired'),
    email: z.string().min(1, 'emailRequired').email('emailInvalid'),
    phone: z.string().min(1, 'phoneRequired'),
    guests: z.coerce.number().min(1, 'guestsMin').max(6, 'guestsMax'),
    checkIn: z
      .string()
      .min(1, 'checkInRequired')
      .refine(isValidDate, { message: 'checkInInvalid' }),
    checkOut: z
      .string()
      .min(1, 'checkOutRequired')
      .refine(isValidDate, { message: 'checkOutInvalid' }),
    message: z.string().optional(),
  })
  .refine((data) => {
    const checkInDate = parseDate(data.checkIn);
    const checkOutDate = parseDate(data.checkOut);
    return checkOutDate > checkInDate;
  }, {
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

