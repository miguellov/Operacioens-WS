import { NextResponse } from 'next/server';
import { z } from 'zod';

const whatsappSchema = z.object({
  phone: z.string().min(1),
  text: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parse = whatsappSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { phone, text } = parse.data;
  const accessToken = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!accessToken || !phoneId) {
    return NextResponse.json({ error: 'WhatsApp configuration is missing' }, { status: 500 });
  }

  const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phone,
      type: 'text',
      text: { body: text },
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: result.error?.message || 'WhatsApp API error', details: result }, { status: response.status });
  }

  return NextResponse.json({ success: true, result });
}
