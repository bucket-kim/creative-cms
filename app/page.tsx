import { createClient } from "@/lib/supabase/client";

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.from('tenants').select("*")

  if (error) {
    return <div>Error: {error.message}</div>
  }


  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
