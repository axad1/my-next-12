import Link from "next/link";
import Router, { useRouter } from "next/router";

export default function Hero(props) {
  console.log("props => ", props);
  const router = useRouter();

  if (router.isFallback) return <h1>Loading...</h1>;

  const handleDelete = async (_id) => {
    const res = await fetch(
      `http://localhost:3000/api/hero/${Router.query.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (data.status) Router.replace("/hero");
    else alert("failed to delete");
  };
  return (
    <>
      <div>
        <h3>Hero</h3>
        <p>
          <b>superhero</b>
        </p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

// // it will work fine with build
// Hero.getInitialProps = async (ctx) => {
//   const id = ctx.query.id;
//   const res = await fetch(`http://localhost:3000/api/hero/${id}`);
//   const data = await res.json();
//   return {
//     hero: data.status ? data.data : null,
//   };
// };

// it must be combined with getStaticProps
export const getStaticPaths = async (ctx) => {
  return {
    paths: [
      { params: { id: "6741f452ba8dfb051084fc76" } },
      // { params: { id: "674231a9ba8dfb051084fc8e" } },
      // { params: { id: "674231b0ba8dfb051084fc91" } },
    ],
    fallback: true,
  };
};

// it will not work with build bcz api server is not running during build
export const getStaticProps = async (ctx) => {
  const id = ctx.params.id;
  const res = await fetch(`http://localhost:3000/api/hero/${id}`);
  const data = await res.json();

  if (!data.status)
    return {
      notFound: true,
    };

  return {
    props: {
      hero: data.status ? data.data : null,
    },
  };
};

// export const getServerSideProps = async (ctx) => {
//   const res = await fetch(`http://localhost:3000/api/hero/${ctx.params.id}`);
//   const data = await res.json();
//   return {
//     props: {
//       hero: data.status ? data.data : null,
//     },
//   };
// };
