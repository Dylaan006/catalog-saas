import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123'); // Fallback for build

export async function sendOrderConfirmation(order: any, storeConfig: any) {
    if (!process.env.RESEND_API_KEY) {
        console.log('RESEND_API_KEY missing. Skipping email.');
        return;
    }

    const { id, total, items, user } = order;

    // Default store name if config missing
    const storeName = storeConfig?.storeName || 'Pixel Catalog';
    const primaryColor = storeConfig?.primaryColor || '#000000';

    try {
        await resend.emails.send({
            from: `${storeName} <onboarding@resend.dev>`, // Todo: Use verified domain
            to: [user.email],
            subject: `Confirmación de Orden #${id.slice(-8)}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: ${primaryColor};">${storeName}</h1>
                    <h2>¡Gracias por tu compra, ${user.name}!</h2>
                    <p>Hemos recibido tu orden <strong>#${id.slice(-8)}</strong>.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="border-bottom: 1px solid #eee;">
                                <th style="text-align: left; padding: 10px;">Producto</th>
                                <th style="text-align: right; padding: 10px;">Cantidad</th>
                                <th style="text-align: right; padding: 10px;">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((item: any) => `
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 10px;">${item.productName || 'Producto'}</td>
                                    <td style="text-align: right; padding: 10px;">${item.quantity}</td>
                                    <td style="text-align: right; padding: 10px;">$${item.price.toLocaleString('es-AR')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="text-align: right; padding: 10px; font-weight: bold;">Total</td>
                                <td style="text-align: right; padding: 10px; font-weight: bold;">$${total.toLocaleString('es-AR')}</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <p style="margin-top: 20px;">
                        Si tienes alguna duda, contáctanos por WhatsApp.
                    </p>
                </div>
            `
        });
        console.log(`Email enviado a ${user.email}`);
    } catch (error) {
        console.error('Error enviando email:', error);
    }
}
