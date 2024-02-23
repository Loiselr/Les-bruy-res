import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: '/', text: 'Accueil'},
  { id: 2, url: 'about', text: 'A Propos'},
  { id: 3, url: 'products', text: 'Produits'},
  { id: 4, url: 'cart', text: 'Panier'},
  { id: 5, url: 'checkout', text: 'Paiement'},
  { id: 6, url: 'orders', text: 'Commandes'},
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === 'checkout' || url ==='orders') && !user) return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  )
}
export default NavLinks;
