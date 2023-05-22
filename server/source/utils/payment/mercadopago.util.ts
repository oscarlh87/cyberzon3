import mercadopago from 'mercadopago';
mercadopago.configurations.setAccessToken('TEST-8996179535531122-050412-52fc66edac0f898f91560cf495c70482-672604099');

export type PreferenceItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

export async function createPreference(items: Array<PreferenceItem>) {
  try {
    const response = await mercadopago.preferences.create({ items: items });
    return response.body.id;
  } catch (error) {
    return null;
  }
}
