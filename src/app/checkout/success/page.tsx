import Link from "next/link";
export default async function Success({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="font-serif text-4xl font-bold">Thank you — order received!</h1>
      {order && <p className="mt-4 text-lg">Your order number is <strong>{order}</strong></p>}
      <p className="text-[#777777] mt-2">We will confirm your order on WhatsApp / phone shortly. You can track it anytime with your order number and phone.</p>
      <div className="flex gap-3 justify-center mt-6">
        <Link href="/track" className="bg-[#172b3a] text-white px-6 py-3 rounded-full">Track Order</Link>
        <Link href="/" className="border border-[#92765c] px-6 py-3 rounded-full">Continue Shopping</Link>
      </div>
    </div>
  );
}
