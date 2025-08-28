import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";


const GET_PRODUCTS = gql`
  query Products($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;


function ProductTable() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { search: "", status: "All", warehouse: "" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table>
      <tbody>
        {data.products.map((p: any) => (
          <tr key={p.id}>
            <td>Name: {p.name}</td>
            <td> {p.sku}</td>
            <td>{p.warehouse}</td>
            <td>{p.stock}</td>
            <td>{p.demand}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ProductTable;