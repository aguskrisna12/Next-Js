import Card from "@/Components/Card";
import { GetServerSideProps } from "next";
import { ProductInterface } from "@/type/Product";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function Home({ data }: { data: ProductInterface[] }) {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-[8rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
          <Card data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await response.json();
  return { props: { data } };
};
