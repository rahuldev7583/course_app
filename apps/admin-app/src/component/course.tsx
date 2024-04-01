import Cookies from "js-cookie";
import { CourseInput } from "common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseInputAtom, coursesAtom, courseStatusAtom } from "store";
import axios from "axios";

interface ExtendedCourseInput extends CourseInput {
  id: number;
}

export default function CourseForm() {
  const API_URL = process.env.API_URL;
  const course = useRecoilValue(coursesAtom);
  const courseInput = useRecoilValue(courseInputAtom);
  const setCourseInput = useSetRecoilState(courseInputAtom);
  const setCourseStatus = useSetRecoilState(courseStatusAtom);
  const courseStatus = useRecoilValue(courseStatusAtom);

  const handleCourseChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const parsedValue =
      type === "checkbox"
        ? checked
        : name === "price"
          ? parseInt(value)
          : value;

    setCourseInput({
      ...courseInput,
      [name]: parsedValue,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = CourseInput.safeParse(courseInput);
    if (validation.success) {
      const response = await axios.post(`${API_URL}/course`, courseInput, {
        withCredentials: true,
      });
      const data = response.data;
      setCourseStatus({ ...courseStatus, showCourse: true, showForm: false });
      setCourseInput({
        title: "",
        description: "",
        price: null,
        published: false,
        imageLink: "",
      });
    } else {
      console.error("Validation errors:");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCourseClick(courseStatus.courseToUpdate, courseInput);
  };
  const updateCourseClick = async (
    courseId: number,
    updatedCourse: ExtendedCourseInput
  ) => {
    try {
      const courseToUpdate = course.find((c) => c.id === courseId);
      if (!courseToUpdate) {
        console.error(`Course with ID ${courseId} not found.`);
        return;
      }
      const updatePayload = updatedCourse;
      const response = await axios.put(
        `${API_URL}/course/${courseId}`,
        updatePayload,
        { withCredentials: true }
      );
      const data = response.data;
      setCourseStatus({
        ...courseStatus,
        updateCourse: false,
        showForm: false,
        showCourse: true,
        courseToUpdate: null,
      });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };
  return (
    <div>
      <form
        id="myForm"
        onSubmit={!courseStatus.updateCourse ? handleSubmit : handleUpdate}
        className="text-[#363960] font-sans  relative mt-4 ml-16 w-[75%] md:w-[25%] text-base md:text-lg md:ml-[41%]"
      >
        <label htmlFor="title" className="">
          Title
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2  rounded-md w-[90%]"
          onChange={handleCourseChange}
          type="text"
          name="title"
          placeholder="title"
          value={courseInput.title}
          required
        />
        <br />
        <label htmlFor="description" className="">
          Description
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%]"
          onChange={handleCourseChange}
          type="text"
          name="description"
          placeholder="description"
          value={courseInput.description}
          required
        />
        <br />
        <label htmlFor="price" className="">
          Price
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%] "
          onChange={handleCourseChange}
          type="number"
          name="price"
          placeholder="price"
          value={courseInput.price !== null ? courseInput.price : ""}
          required
        />
        <br />
        <label htmlFor="imageLink" className="">
          Image Link
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%] "
          onChange={handleCourseChange}
          type="text"
          name="imageLink"
          placeholder="imageLink"
          value={courseInput.imageLink}
          required
        />
        <br />
        <label htmlFor="published">Published</label>
        <input
          type="checkbox"
          value={courseInput.published ? "Published" : "Not Published"}
          name="published"
          onChange={handleCourseChange}
          placeholder="published"
        />
        <br />
        <button
          type="submit"
          className="  pt-2 pb-2 pl-4 pr-4  bg-[#363960] text-gray-100 ml-16 mt-6 px-6 md:px-6 py-2 md:py-3 text-xl md:text-2xl font-medium rounded-2xl md:mt-20 md:ml-56 hover:bg-gray-300  hover:text-[#363960]"
        >
          submit
        </button>
      </form>
    </div>
  );
}
