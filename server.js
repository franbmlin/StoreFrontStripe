//  sk_test_51PblgwFP9HFeBwpDKhw5PZrtb5C8X3rPGu4ItNmJKRzg1lJsm9xhQzJUC32RkjGRYWc9UFlrTpg10yUbD3EjWjCY00DJQo9UBs
// coffee price_1Pbm1TFP9HFeBwpDuYc0NFUP
// sunglasses price_1Pbm1xFP9HFeBwpD6CsR8hg8
// camera price_1Pbm2IFP9HFeBwpDNeyplH0g

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PblgwFP9HFeBwpDKhw5PZrtb5C8X3rPGu4ItNmJKRzg1lJsm9xhQzJUC32RkjGRYWc9UFlrTpg10yUbD3EjWjCY00DJQo9UBs');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post('/checkout', async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });
    
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});

app.listen(4000, () => console.log("Listening on port 4000!"));

/*
stripe wants:
[
    {
        price: 1,
        quantity: 3
    }
]

req.body.items:
[
    {
        id: 1,
        quantity: 3
    }
]
*/