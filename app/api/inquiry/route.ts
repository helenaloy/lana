import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validators';
import { checkRateLimit, sendInquiryEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = inquirySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const locale = body.locale || 'hr';

    // Send email
    try {
      await sendInquiryEmail(data, locale);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        {
          error:
            locale === 'hr'
              ? 'Greška pri slanju emaila. Molimo pokušajte ponovno.'
              : 'Error sending email. Please try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          locale === 'hr'
            ? 'Vaš upit je uspješno poslan!'
            : 'Your inquiry has been sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

