import Image from "next/image"

type TestimonialCardProps = {
  name: string;  // Using 'name' instead of 'author'
  role: string;
  quote: string;
  imageUrl?: string;
};

export function TestimonialCard({ name, role, quote, imageUrl }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`${name}'s portrait`}
          width={64}
          height={64}
          className="rounded-full mx-auto mb-4"
        />
      )}
      <p className="text-lg italic">&quot;{quote}&quot;</p>
      <footer className="mt-4">
        <cite className="block font-semibold">{name}</cite>
        <span className="text-gray-500">{role}</span>
      </footer>
    </div>
  );
}
