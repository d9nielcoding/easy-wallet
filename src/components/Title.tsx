export default function Title({ title }: { title: string }) {
  return (
    <h2 className="text-foreground mb-4 ml-2 text-2xl font-bold">{title}</h2>
  );
}
