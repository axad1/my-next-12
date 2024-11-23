import Link from "next/link";
import Router from "next/router";

export default function Heroes({ heroes = [] }) {
  console.log("props => ", heroes);

  const handleDelete = async (_id) => {
    const res = await fetch(`http://localhost:3000/api/hero/${_id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status) Router.replace("/hero");
    else alert("failed to delete");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginInline: "1rem",
        }}
      >
        <h3>Heroes</h3>
        <Link href="/hero/new">
          <button>Add New</button>
        </Link>
      </div>
      <ul>
        {heroes.map((hero) => {
          return (
            <li key={hero._id}>
              <Link href={`/hero/${hero._id}`}>
                <b>{hero.superHero}</b> -- {hero.realName} --{" "}
                <button onClick={() => handleDelete(hero._id)}>Delete</button>
                <hr />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// // it will work fine with build
// Heroes.getInitialProps = async (ctx) => {
//   const res = await fetch("http://localhost:3000/api/hero");
//   const data = await res.json();
//   return {
//     heroes: data.data,
//   };
// };

// it will not work with build bcz api server is not running during build
export const getStaticProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/hero");
  const data = await res.json();
  return {
    props: {
      heroes: data.data,
    },
  };
};
