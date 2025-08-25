import { useState } from "react";

export default function TaskForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    date: "3 Jan, 4:35 PM",
    description: "",
    status: "",
    source: "",
    rating: '',
    verified: false,
    title: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement; 
    
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? target.checked
          : type === "number"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    
    onSubmit(formData);
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full max-w-md mx-auto"
>
  <h2 className="text-xl font-semibold">Create Task</h2>

  {/* Title */}
  <div>
    <label className="block text-sm font-medium mb-1">Title</label>
    <select
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="w-full border rounded-lg px-3 py-2"
      required
    >
      <option value="">Select title</option>
      <option value="Draft">Draft</option>
      <option value="Unsolved">Unsolved</option>
      <option value="Under Review">Under Review</option>
      <option value="Solved">Solved</option>
      <option value="Needs">Needs</option>
    </select>
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium mb-1">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
      rows={3}
      placeholder="Task description..."
    />
  </div>

  {/* Date */}
<div>
  <label className="block text-sm font-medium mb-1">Date</label>
  <input
    type="text"
    name="date"
    value={formData.date}
    readOnly
    className="w-full border rounded-lg px-3 py-2  cursor-not-allowed text-gray-400"
  />
</div>


  {/* Status */}
  <div>
    <label className="block text-sm font-medium mb-1">Status</label>
    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="w-full border rounded-lg px-3 py-2"
    >
      <option value="">Select status</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Critical">Critical</option>
    </select>
  </div>

  {/* Source */}
  <div>
    <label className="block text-sm font-medium mb-1">Source</label>
    <select
      name="source"
      value={formData.source}
      onChange={handleChange}
      className="w-full border rounded-lg px-3 py-2"
    >
      <option value="">Select source</option>
      <option value="Getastra">Getastra</option>
      <option value="Source Code">Source Code</option>
      <option value="Hypejab">Hypejab</option>
    </select>
  </div>

  {/* Rating */}
<div>
  <label className="block text-sm font-medium mb-1">Rating</label>
  <input
    type="number"
    name="rating"
    value={formData.rating}
    max={10}
    step={0.1} // ✅ allows decimals like 7.5, 8.3
    onChange={handleChange}
    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
  />
</div>


  {/* Verified */}
  <div>
    <label className="block text-sm font-medium mb-1">Verified</label>
    <select
      name="verified"
      value={String(formData.verified)}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          verified: e.target.value === "true",
        }))
      }
      className="w-full border rounded-lg px-3 py-2"
    >
      <option value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    Save Task
  </button>
    </form>

  );
}
