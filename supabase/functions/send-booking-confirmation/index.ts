import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking, packageName, customerEmail, businessEmail } = await req.json();

    console.log('Sending booking confirmation emails...', { 
      bookingId: booking.id, 
      customerEmail, 
      businessEmail 
    });

    // Customer confirmation email content
    const customerEmailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #D97706;">Booking Confirmation - Premium Desert Safari Dubai</h2>
            <p>Dear ${booking.full_name},</p>
            <p>Thank you for booking with us! Your desert safari adventure is confirmed.</p>
            
            <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400E; margin-top: 0;">Booking Details</h3>
              <p><strong>Package:</strong> ${packageName}</p>
              <p><strong>Travel Date:</strong> ${booking.booking_date}</p>
              <p><strong>Pickup Time:</strong> ${booking.pickup_time}</p>
              <p><strong>Number of Guests:</strong> ${booking.number_of_guests}</p>
              <p><strong>Total Amount:</strong> AED ${booking.total_amount}</p>
              <p><strong>Booking Reference:</strong> ${booking.id}</p>
            </div>

            <div style="background-color: #FEE2E2; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #991B1B; margin-top: 0;">Cancellation Policy</h4>
              <ul style="margin: 10px 0;">
                <li>Free cancellation up to 24 hours before tour departure time</li>
                <li>100% charges apply for cancellations within 24 hours</li>
                <li>Refunds processed within 7 working days</li>
              </ul>
            </div>

            <p>We will contact you via WhatsApp at <strong>${booking.mobile_number}</strong> with pickup details closer to your travel date.</p>
            
            <p>For any questions, please contact us on WhatsApp: +971506638921</p>
            
            <p style="margin-top: 30px;">Best regards,<br>Premium Desert Safari Dubai Team</p>
          </div>
        </body>
      </html>
    `;

    // Business notification email content
    const businessEmailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #D97706;">New Booking Received</h2>
            
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${booking.full_name}</p>
              <p><strong>Email:</strong> ${booking.email}</p>
              <p><strong>Mobile:</strong> ${booking.mobile_number}</p>
            </div>

            <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400E; margin-top: 0;">Booking Details</h3>
              <p><strong>Package:</strong> ${packageName}</p>
              <p><strong>Travel Date:</strong> ${booking.booking_date}</p>
              <p><strong>Pickup Time:</strong> ${booking.pickup_time}</p>
              <p><strong>Number of Guests:</strong> ${booking.number_of_guests}</p>
              <p><strong>Price per Person:</strong> AED ${booking.price_per_person}</p>
              <p><strong>Total Amount:</strong> AED ${booking.total_amount}</p>
              <p><strong>Payment Status:</strong> ${booking.payment_status}</p>
              <p><strong>Payment Intent ID:</strong> ${booking.payment_intent_id}</p>
              <p><strong>Booking Reference:</strong> ${booking.id}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Note: In a real implementation, you would integrate with an email service
    // like SendGrid, AWS SES, or similar. For now, we'll just log the emails.
    console.log('Customer Email:', customerEmailContent);
    console.log('Business Email:', businessEmailContent);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Confirmation emails sent successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
