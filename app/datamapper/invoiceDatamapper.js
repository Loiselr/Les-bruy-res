import client from "../../data/pg.client.js";

const invoiceDatamapper = {

  // fonction qui retourne toutes les factures
  async findAllInvoices() {
    try {
      const query = `
      SELECT
        invoice.id AS invoice_id,
        "user".name AS user_name,
        "user".email AS user_email,
        "user".phone_number AS user_phone_number,
        "user".address AS user_address,
        "user".city AS user_city,
        "user".zip_code AS user_zip_code,
        invoice.process_status AS process_status,
        invoice.issued_at AS issued_at,
        invoice.paid_at AS paid_at,
        cart.id AS cart_id,
        cart.created_at AS cart_created_at,
          ARRAY_AGG(DISTINCT article.name) AS article_names,
          ARRAY_AGG(DISTINCT cart_has_article.article_quantity) AS article_quantities,
          ARRAY_AGG(DISTINCT article.article_price) AS article_prices,
          ARRAY_AGG(DISTINCT cart_has_article.article_quantity * article.article_price) AS total_article_prices,
            SUM(cart_has_article.article_quantity * article.article_price) AS total_invoice_price
      FROM invoice
        INNER JOIN "user"
          ON invoice.user_id = "user".id
        LEFT JOIN cart
          ON cart.user_id = "user".id LEFT
        JOIN cart_has_article
          ON cart.id = cart_has_article.cart_id
        LEFT JOIN article
          ON cart_has_article.article_id = article.id
      GROUP BY
        "user".name,
        "user".email,
        "user".phone_number,
        "user".address,
        "user".city,
        "user".zip_code,
        invoice.id,
        invoice.process_status,
        invoice.issued_at,
        invoice.paid_at,
        cart.id,
        cart.created_at
      ORDER BY issued_at DESC;`;
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // fonction qui cherche une facture par son id 
  async findOneInvoiceById(id) {
    try {
      const query = {
        text: `SELECT
        invoice.id AS invoice_id,
        "user".name AS user_name,
        "user".email AS user_email,
        "user".phone_number AS user_phone_number,
        "user".address AS user_address,
        "user".city AS user_city,
        "user".zip_code AS user_zip_code,
        invoice.process_status AS process_status,
        invoice.issued_at AS issued_at,
        invoice.paid_at AS paid_at,
        invoice.updated_at AS updated_at,
        cart.id AS cart_id,
        cart.created_at AS cart_created_at,
          ARRAY_AGG(DISTINCT article.name) AS article_names,
          ARRAY_AGG(DISTINCT cart_has_article.article_quantity) AS article_quantities,
          ARRAY_AGG(DISTINCT article.article_price) AS article_prices,
          ARRAY_AGG(DISTINCT cart_has_article.article_quantity * article.article_price) AS total_article_prices,
            SUM(cart_has_article.article_quantity * article.article_price) AS total_invoice_price
      FROM invoice
        INNER JOIN "user"
          ON invoice.user_id = "user".id
        LEFT JOIN cart
          ON cart.user_id = "user".id LEFT
        JOIN cart_has_article
          ON cart.id = cart_has_article.cart_id
        LEFT JOIN article
          ON cart_has_article.article_id = article.id
	WHERE "invoice".id = $1
      GROUP BY
        "user".name,
        "user".email,
        "user".phone_number,
        "user".address,
        "user".city,
        "user".zip_code,
        invoice.id,
        invoice.process_status,
        invoice.issued_at,
        invoice.paid_at,
        invoice.updated_at,
        cart.id,
        cart.created_at;`,
        values: [id]
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },
  // fonction qui retourne toutes les factures d'un user par son id
  async findInvoiceByUserId(id) {
    try {
      const query = {
        text: `
        SELECT
          invoice.id AS invoice_id,
          "user".name AS user_name,
          "user".email AS user_email,
          "user".phone_number AS user_phone_number,
          "user".address AS user_address,
          "user".city AS user_city,
          "user".zip_code AS user_zip_code,
          invoice.process_status AS process_status,
          invoice.issued_at AS issued_at,
          invoice.paid_at AS paid_at,
          invoice.updated_at AS updated_at,
          cart.id AS cart_id,
          cart.created_at AS cart_created_at,
        ARRAY_AGG(article.name) AS article_names,
        ARRAY_AGG(cart_has_article.article_quantity) AS article_quantities,
        ARRAY_AGG(article.article_price) AS article_prices,
        ARRAY_AGG(cart_has_article.article_quantity * article.article_price) AS total_article_prices,
          SUM(cart_has_article.article_quantity * article.article_price) AS total_invoice_price
        FROM "user"
          LEFT JOIN invoice
            ON "user".id = invoice.user_id
          LEFT JOIN cart
            ON "user".id = cart.user_id
          LEFT JOIN cart_has_article
            ON cart.id = cart_has_article.cart_id
          LEFT JOIN article
            ON cart_has_article.article_id = article.id
        WHERE
          "user".id = $1
        GROUP BY "user".name,
          "user".email,
          "user".phone_number,
          "user".address,
          "user".city,
          "user".zip_code,
          invoice.id,
          invoice.process_status,
          invoice.issued_at,
          invoice.paid_at,
          invoice.updated_at,
          cart.id,
          cart.created_at;`,
        values: [id],
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // fonction qui retourne une facture par l'id du panier
  async findInvoiceByCartId(id) {
    try {
      const query = {
        text: `
        SELECT
          cart.id AS cart_id,
          "user".name AS user_name,
          "user".email AS user_email,
          "user".phone_number AS user_phone_number,
          "user".address AS user_address,
          "user".city AS user_city,
          "user".zip_code AS user_zip_code,
          cart.created_at AS cart_created_at,
        ARRAY_AGG(article.name) AS article_names,
        ARRAY_AGG(cart_has_article.article_quantity) AS article_quantities,
        ARRAY_AGG(article.article_price) AS article_prices,
        ARRAY_AGG(cart_has_article.article_quantity * article.article_price) AS total_article_prices,
          MAX(invoice.paid_at) AS paid_at,
          MAX(invoice.issued_at) AS issued_at,
          MAX(invoice.process_status) AS process_status,
            SUM(cart_has_article.article_quantity * article.article_price) AS total_invoice_price
        FROM cart
          JOIN "user"
            ON cart.user_id = "user".id
          LEFT JOIN invoice
            ON cart.user_id = invoice.user_id
          JOIN cart_has_article
            ON cart.id = cart_has_article.cart_id
          JOIN article
            ON cart_has_article.article_id = article.id
        WHERE
          cart.id = $1
            GROUP BY
              "user".name,
              "user".email,
              "user".phone_number,
              "user".address,
              "user".city,
              "user".zip_code,
              cart.id,
              cart.created_at;`,
        values: [id],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  //fonction de création d'une facture (invoice)
  async postInvoice(cartId) {
    try {

      const query = {
        text: `
        WITH
          Panier_Details AS (
            SELECT
              cart.id AS cart_id,
              cart.user_id,
              cart.created_at AS cart_created_at,
              article.name AS article_name,
              article.article_price,
              cart_has_article.article_quantity,
              article.article_price * cart_has_article.article_quantity AS total_article_price
            FROM cart
              JOIN cart_has_article
                ON cart.id = cart_has_article.cart_id
              JOIN article
                ON cart_has_article.article_id = article.id
            WHERE
              cart.id = $1
          ),
          Inserted_Invoice AS (
            INSERT INTO invoice (user_id, process_status, issued_at, paid_at)
            SELECT user_id, 'En attente', now(), now()
              FROM Panier_Details
            GROUP BY user_id RETURNING id
          )
        SELECT
          Inserted_Invoice.id AS invoice_id,
          "user".name AS user_name
        FROM Inserted_Invoice
          JOIN "user"
            ON "user".id = (SELECT user_id FROM Panier_Details LIMIT 1);`,
        values: [cartId],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // function de mise à jour d'une facture
  async updateInvoice(process, invoiceId) {
    try {
      // const { process_status, paid_at } = data;
      const query = {
        text: "UPDATE invoice SET process_status=$1, updated_at=now() WHERE id=$2 RETURNING *",
        values: [process, invoiceId]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
};
export default invoiceDatamapper;
