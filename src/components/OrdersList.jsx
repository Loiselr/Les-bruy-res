import { useLoaderData } from 'react-router-dom';

const OrdersList = () => {
  return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>
        Nb de commandes : 5
      </h4>
      
      <div className='overflow-x-auto '>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>Nom de livraison</th>
              <th>Addresse de livraison</th>
              <th>Nb de Produits</th>
              <th>Prix TTC </th>
              <th>Etat de la cde</th>
              <th className='hidden sm:block'>Date de cde ou livraison</th>
            </tr>
          </thead>
          <tbody>
            <td>Banana Doe</td>
            <td>148 rue du chemin vert 75014 Paris</td>
            <td>10</td>
            <td>79.90€</td>
            <td>en préparation</td>
            <td className='hidden sm:block'>28/02/2024</td>
          </tbody>
          <tbody>
            <td>Banana Doe</td>
            <td>148 rue du chemin vert 75014 Paris</td>
            <td>2</td>
            <td>15€</td>
            <td>en cours de livraison</td>
            <td className='hidden sm:block'>29/02/2024</td>
          </tbody>
          <tbody>
            <td>Banana Doe</td>
            <td>148 rue du chemin vert 75014 Paris</td>
            <td>5</td>
            <td>59.90€</td>
            <td>livrée</td>
            <td className='hidden sm:block'>16/01/2024</td>
          </tbody>
          <tbody>
            <td>Banana Doe</td>
            <td>148 rue du chemin vert 75014 Paris</td>
            <td>15</td>
            <td>159.90€</td>
            <td>livrée</td>
            <td className='hidden sm:block'>12/12/2023</td>
          </tbody>
          <tbody>
            <td>Banana Doe</td>
            <td>148 rue du chemin vert 75014 Paris</td>
            <td>8</td>
            <td>259.90€</td>
            <td>livrée</td>
            <td className='hidden sm:block'>10/12/2023</td>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;