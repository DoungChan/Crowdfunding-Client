import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { CustomButton } from "../components";
import { loader, money } from "../assets";
import { checkIfImage } from "../utils";
import { FormFiled } from "../components";
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const handleFormChange = (fileName, e) => {
    setForm({ ...form, [fileName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check imgae and proceed
    if (checkIfImage(form.image)) {
      setIsLoading(true);
      const deadline = new Date(form.deadline);
      const deadlineTimestamp = deadline.getTime() / 1000;
      const target = ethers.utils.parseEther(form.target);
      const data = {
        name: form.name,
        title: form.title,
        description: form.description,
        target,
        deadline: deadlineTimestamp,
        image: form.image,
      };
      console.log(data);
      setIsLoading(false);
      navigate("/campaigns");
    }
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue text-bold sm:text[25px] text-[18px] leading-[38px] text-white">
          {" "}
          Start Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormFiled
            labelName="Your Name *"
            placeholder="Write Your Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => {
              handleFormChange("name", e);
            }}
          />
          <FormFiled
            labelName="Title *"
            placeholder="Write a tittle"
            inputType="text"
            value={form.title}
            handleChange={(e) => {
              handleFormChange("title", e);
            }}
          />
        </div>
        <FormFiled
          labelName="Description *"
          placeholder="Write a description"
          inputType="text"
          value={form.description}
          handleChange={(e) => {
            handleFormChange("description", e);
          }}
          isTextArea
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] -h[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          ></img>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount{" "}
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormFiled
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => {
              handleFormChange("target", e);
            }}
          />
          <FormFiled
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => {
              handleFormChange("deadline", e);
            }}
          />
        </div>
        <div>
          <FormFiled
            labelName="Image *"
            placeholder="Place image url "
            inputType="url"
            value={form.image}
            handleChange={(e) => {
              handleFormChange("image", e);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-[30px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            handleClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
