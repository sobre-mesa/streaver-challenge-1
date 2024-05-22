"use client";
import React, { useState, useEffect } from "react";
import { IPost } from "@/types/IPost";
import { PostRequestBody } from "@/types/PostRequestBody";

const postNewPost = async (post: PostRequestBody<IPost>, onSuccess: () => void) => {
  try {
    const response = await fetch('/api/blog-api-v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error('Failed to create new post');
    }

    const data = await response.json();
    console.log('Post created successfully:', data);
    onSuccess(); 
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export const NewPostSection = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postCreated, setPostCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: PostRequestBody<IPost> = {
      title,
      body,
      userId: 10,
    };

    postNewPost(newPost, () => setPostCreated(true)); 
    setTitle("");
    setBody("");
  };

  useEffect(() => {
    if (postCreated) {
      window.location.reload(); 
      setPostCreated(false);
    }
  }, [postCreated]);

  return (
    <div className="mb-12">
      <form 
        onSubmit={handleSubmit} 
        className="relative flex flex-col items-end gap-y-3"
      >
        <div className="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-inset ring-gray-200 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <textarea
            rows={1}
            name="title"
            id="title"
            className="block w-full resize-none border-0 bg-transparent py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-inset ring-gray-200 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Comment
        </button>
      </form>
    </div>
  );
};
