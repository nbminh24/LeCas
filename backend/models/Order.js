const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        },
        shippingAddress: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'paypal', 'bank_transfer'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending'
        },
        trackingNumber: {
            type: String
        },
        notes: {
            type: String
        },
        shippingFee: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Virtual for URL
orderSchema.virtual('url').get(function () {
    return `/orders/${this._id}`;
});

// Method to calculate total amount
orderSchema.methods.calculateTotal = function () {
    const productTotal = this.products.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return productTotal + this.shippingFee;
};

// Pre-save hook to update total amount
orderSchema.pre('save', function (next) {
    if (this.isModified('products') || this.isModified('shippingFee')) {
        this.totalAmount = this.calculateTotal();
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
