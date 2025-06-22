const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: 'https://placehold.co/600x400?text=Product+Image'
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        sku: {
            type: String,
            required: true,
            unique: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        ratings: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5
                },
                review: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        averageRating: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Virtual for URL
productSchema.virtual('url').get(function () {
    return `/products/${this._id}`;
});

// Calculate average rating before saving
productSchema.pre('save', function (next) {
    if (this.ratings.length > 0) {
        this.averageRating = this.ratings.reduce((acc, item) => acc + item.rating, 0) / this.ratings.length;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
