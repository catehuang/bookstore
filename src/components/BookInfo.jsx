import React, { useState } from "react";
import { GetABook, CreateABook, UpdateABook, DeleteABook } from "../api/book"


function BookInfo({ book }) {
    const [name, setName] = useState(book ? book.name : "");
    const [image, setImage] = useState(book ? book.image : "");
    const [author, setAuthor] = useState(book ? book.author : "");
    const [categories, setCategories] = useState(book ? book.categories : []);
    const [featuredCategory, setFeaturedCategory] = useState(
        book ? book.featuredCategory : ""
    );
    const [reviews, setReviews] = useState(book ? book.reviews : 0);
    const [description, setDescription] = useState(book ? book.description : "");
    const [price, setPrice] = useState(book ? book.price : 0.0);
    const [quantity, setQuantity] = useState(book ? book.quantity : 0);
    const [stars, setStars] = useState(book ? book.stars : 0.0);
    const [message, setMessage] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)

    const handleSave = (e) => {
        e.preventDefault()
        if (book._id) {
            UpdateABook({
                _id: book._id,
                name,
                author,
                image,
                categories,
                featuredCategory,
                reviews,
                description,
                price,
                quantity,
                stars
            }).then(result => {
                if (!result) {
                    setMessage("Error. Failed to update a book.")
                } else {
                    setMessage("Updated successfully.")
                }
            })
        }
        else {
            CreateABook({
                name,
                author,
                image,
                categories,
                featuredCategory,
                reviews,
                description,
                price,
                quantity,
                stars
            }).then(result => {
                if (!result) {
                    setMessage("Error. Failed to save a new book.")
                } else {
                    setMessage("A new book saved successfully.")
                }
            })
        }
    }

    const handleDelete = () => {
        DeleteABook(book).then(result => {
            if (!result) {
                setMessage("Error. Failed to delete a new book.")
            } else {
                console.log("A new book deleted successfully.")
                setIsDeleted(true)
                window.location.reload()
            }
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        GetABook(book._id).then(result => {
            setName(result.name)
            setAuthor(result.author)
            setImage(result.image)
            setCategories(result.categories)
            setFeaturedCategory(result.featuredCategory)
            setReviews(result.reviews)
            setDescription(result.description)
            setPrice(result.price)
            setQuantity(result.quantity)
            setStars(result.stars)
        })
        setMessage("")
    }

    return (
        <form className="my-10 bg-white p-5 rounded-lg border border-sky-600" display={isDeleted? "none" : "block"}>
            <div
                className="flex"
            >
                <img
                    src={image}
                    alt=""
                    className="object-contain h-40 w-36 mx-auto my-auto"
                />

                <div className="md:grid md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-x-10 mx-auto w-4/5">
                    {
                        message && (
                            <div className="md:col-span-2 xl:col-span-3 text-center bg-yellow-200 text-sky-900 rounded py-1">
                                <p>{message}</p>
                            </div>
                        )
                    }
                    <div>
                        <p>Name</p>
                        <input
                            type="text"
                            value={name}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Image URL</p>
                        <input
                            type="text"
                            value={image}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Author</p>
                        <input
                            type="text"
                            value={author}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Categories</p>
                        <input
                            type="text"
                            value={categories}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) => setCategories(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>FeaturedCategory</p>
                        <input
                            type="text"
                            value={featuredCategory}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) => setFeaturedCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Price</p>
                        <input
                            type="number"
                            min="0.0"
                            value={price}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) =>
                                setPrice(e.target.value.replace(/[^0-9. ]/gi, ""))
                            }
                        />
                    </div>
                    <div>
                        <p>Quantity</p>
                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) =>
                                setQuantity(e.target.value.replace(/[^0-9]/gi, ""))
                            }
                        />
                    </div>
                    <div>
                        <p>Reviews</p>
                        <input
                            type="number"
                            min="0"
                            value={reviews}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) => setReviews(e.target.value.replace(/[^0-9]/gi, ""))}
                        />
                    </div>
                    <div>
                        <p>Stars</p>
                        <input
                            type="number"
                            min="0.0"
                            max="5.0"
                            value={stars}
                            className="rounded border border-gray-400 px-2 w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) =>
                                setStars(e.target.value.replace(/[^0-9. ]/gi, ""))
                            }
                        />
                    </div>
                    <div className="md:col-span-2 xl:col-span-3">
                        <p>Description</p>
                        <textarea
                            value={description}
                            rows="2"
                            cols="22"
                            className="rounded border border-gray-400 px-2 form-control
                    block
                    w-full disabled:border-none disabled:px-0 bg-gray-100"
                            required
                            onChange={(e) =>
                                setDescription(
                                    e.target.value.replace(/[^0-9-_.a-z"(), #]/gi, "")
                                )
                            }
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="border rounded py-1 w-full bg-sky-600 hover:bg-sky-700 text-sky-100 hover:text-white"
                            onClick={handleSave}
                        >
                            SAVE
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="border rounded py-1 w-full bg-orange-600 hover:bg-orange-700 text-orange-100 hover:text-white"
                            onClick={handleDelete}
                        >
                            DELETE
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="border rounded py-1 w-full bg-green-600 hover:bg-green-700 text-green-50 hover:text-white"
                            onClick={handleReset}
                        >
                            RESET
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BookInfo;
