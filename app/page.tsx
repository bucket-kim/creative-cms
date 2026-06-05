import { createClient } from "@/lib/supabase/client";

export default async function Home() {
  const supabase = createClient()

  const { error } = await supabase.from('tenants').select("*")

  if (error) {
    return <div>Error: {error.message}</div>
  }


  return (
    <div >
      {/* <Header /> */}
      <h1 className="absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] flex flex-col items-center leading-[100%]">
        <span>CREATIVE</span>
        <span>CMS</span>
      </h1>
    </div>
  );
}
