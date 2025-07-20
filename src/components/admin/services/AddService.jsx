/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Service from "../../../config/Service";

const AddService = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("heading", data.heading);
      formData.append("description", data.description);
      formData.append("points", data.points);
      formData.append("type", data.type);
      formData.append("userId", userId);

      if (data.serviceImage && data.serviceImage.length > 0) {
        Array.from(data.serviceImage).forEach((file) => {
          formData.append("serviceImage", file);
        });
      }

      const response = await Service.addService(formData);
      console.log("Service added successfully:", response.data);
      setMessage("Service created successfully!");
      //   reset();
    } catch (error) {
      setMessage(
        error?.response?.data?.error ||
          "Error adding service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white h-[90%] md:h-[70%] overflow-y-auto md:p-5 p-2 rounded-lg shadow-lg w-11/12 md:w-8/12 space-y-2 ">
        <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>

        {message && (
          <div className="mb-4 text-sm text-red-600 font-medium">{message}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Service Title"
              className="w-full border rounded px-3 py-2"
            />
            {errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block font-medium">Heading</label>
            <input
              {...register("heading", { required: true })}
              placeholder="Service Heading"
              className="w-full border rounded px-3 py-2"
            />
            {errors.heading && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Service Description"
              rows={4}
              className="w-full border rounded px-3 py-2"
            />
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block font-medium">
              Points (comma separated)
            </label>
            <input
              {...register("points", { required: true })}
              placeholder="eg. Fast, Reliable, Affordable"
              className="w-full border rounded px-3 py-2"
            />
            {errors.points && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block font-medium">Type</label>
            <input
              {...register("type", { required: true })}
              placeholder="Service Type"
              className="w-full border rounded px-3 py-2"
            />
            {errors.type && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block font-medium">Service Image(s)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("serviceImage")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
