import { useEffect, useRef, useState } from "react";
import type { cardsProps } from "../../Types/KanbanTypes";
import { BsThreeDots } from "react-icons/bs";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { deleteCard, editCard } from "../../app/kanbanslice/KanbanSlice";

interface editPopupProps {
  card: cardsProps;
}

const EditCardPopup = ({ card }: editPopupProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [cardItems, setCardItems] = useState(card)
  const dispatch = useDispatch()

  useEffect(()=>{
    setCardItems(card)
  },[card])

  function handleSubmit(e:any) {
    e.preventDefault()
    dispatch(editCard(cardItems))
    setShowEdit(false)
  }

  function handleChange(e:any) {
    setCardItems(prev=>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    function showEditPopUp(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowEdit(false);
      }
    }

    window.addEventListener("mousedown", showEditPopUp);
    return () => window.removeEventListener("mousedown", showEditPopUp);
  }, []);

  return (
    <>
        {
            showEdit && createPortal(
                <div className='absolute backdrop-blur-sm inset-0 z-[10]'></div>,document.body
            )
        }
      <button
        className="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
        onClick={() => setShowEdit(true)}
      >
        <BsThreeDots />
      </button>
      {showEdit &&
        createPortal(
          <div
            ref={popupRef}
            className="absolute top-[15%] left-[40%] w-100 z-[11]"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full max-w-md mx-auto z-[12]"
            >
              <h2 className="text-xl font-semibold">Delete / Update Task</h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <select
                  name="title"
                  value={cardItems.title}
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
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={cardItems.description}
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
                  value={cardItems.date}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2  cursor-not-allowed text-gray-400"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={cardItems.status}
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
                  value={cardItems.source}
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
                  value={cardItems.rating}
                  max={10}
                  step={0.1} // ✅ allows decimals like 7.5, 8.3
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Verified */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Verified
                </label>
                <select
                  name="verified"
                  value={String(cardItems.verified)}
                  onChange={handleChange}
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
              <button
                onClick={()=>dispatch(deleteCard(cardItems.id))}
                className="w-full border border-gray-400 text-black py-2 rounded-lg"
              >
                Delete Task
              </button>
            </form>
          </div>,
          document.body
        )}
    </>
  );
};

export default EditCardPopup;
