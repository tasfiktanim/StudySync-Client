import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Tutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [availability, setAvailability] = useState("Weekdays");

  const onSubmit = async (data) => {
    const tutorData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      availability,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/tutors", tutorData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your tutor profile is pending approval.",
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">Become a Tutor</h2>
      <p className="text-gray-500 mb-6">Fill out the form to apply as a tutor.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered text-black w-full bg-gray-100"
        />

        {/* Email */}
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered text-black w-full bg-gray-100"
        />

        {/* Education */}
        <input
          type="text"
          placeholder="Highest Education Qualification"
          className="input input-bordered w-full"
          {...register("education", { required: true })}
        />
        {errors.education && (
          <span className="text-red-500 text-sm">Education is required</span>
        )}

        {/* Area of Expertise */}
        <input
          type="text"
          placeholder="Subject Expertise (e.g., Math, Physics)"
          className="input input-bordered w-full"
          {...register("expertise", { required: true })}
        />
        {errors.expertise && (
          <span className="text-red-500 text-sm">Expertise is required</span>
        )}

        {/* Years of Experience */}
        <input
          type="number"
          placeholder="Years of Teaching Experience"
          className="input input-bordered w-full"
          {...register("experience", { required: true, min: 0 })}
        />
        {errors.experience && (
          <span className="text-red-500 text-sm">Experience is required</span>
        )}

        {/* Available Time */}
        <select
          className="select select-bordered w-full"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option>Weekdays</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>

        {/* Profile Image URL */}
        <input
          type="text"
          placeholder="Profile Photo URL"
          className="input input-bordered w-full"
          {...register("photo", { required: true })}
        />
        {errors.photo && (
          <span className="text-red-500 text-sm">Photo URL is required</span>
        )}

        {/* Short Bio */}
        <textarea
          placeholder="Short bio or introduction"
          className="textarea textarea-bordered w-full"
          {...register("bio")}
        ></textarea>

        <button type="submit" className="btn btn-primary w-full text-black mt-4">
          Submit Tutor Application
        </button>
      </form>
    </div>
  );
};

export default Tutors;
