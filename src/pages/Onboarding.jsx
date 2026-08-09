import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

const CLOUD_NAME = "zgicswzb";
const UPLOAD_PRESET = "fitness"; // ⚠️ make sure this EXACTLY matches your Cloudinary preset name, no spaces

export default function Onboarding() {
  const [images, setImages] = useState({ front: null, back: null, left: null, right: null });
  const [previews, setPreviews] = useState({ front: null, back: null, left: null, right: null });
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goals = ["Weight Loss", "Weight Gain", "Muscle Building", "Maintenance"];

  const handleImageChange = (position, file) => {
    if (!file) return;
    setImages((prev) => ({ ...prev, [position]: file }));
    setPreviews((prev) => ({ ...prev, [position]: URL.createObjectURL(file) }));
  };

  const allImagesUploaded = Object.values(images).every((img) => img !== null);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!allImagesUploaded) {
      setError("Please upload all 4 images (Front, Back, Left, Right)");
      return;
    }
    if (!goal) {
      setError("Please select a goal");
      return;
    }

    setLoading(true);
    try {
      const uid = auth.currentUser.uid;
      const imageUrls = {};

      // Upload each image to Cloudinary
      for (const position of Object.keys(images)) {
        const url = await uploadToCloudinary(images[position]);
        imageUrls[position] = url;
      }

      // Save URLs + goal to Firestore
      await setDoc(
        doc(db, "users", uid),
        {
          goal,
          bodyImages: imageUrls,
          onboardingComplete: true,
          onboardedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong uploading your images. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const positions = [
    { key: "front", label: "Front" },
    { key: "back", label: "Back" },
    { key: "left", label: "Left Side" },
    { key: "right", label: "Right Side" },
  ];

  return (
    <div className="page-container onboarding-page">
      <p className="section-title">Step 1 of 1</p>
      <h1>
        BODY <span className="highlight">ANALYSIS</span>
      </h1>
      <p className="page-sub">Upload 4 clear photos so our AI can analyze your posture and body composition</p>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="upload-grid">
          {positions.map((pos) => (
            <label key={pos.key} className="upload-box">
              {previews[pos.key] ? (
                <img src={previews[pos.key]} alt={pos.label} className="upload-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">+</span>
                  <span>{pos.label}</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageChange(pos.key, e.target.files[0])}
              />
            </label>
          ))}
        </div>

        <h2 className="list-heading">Select Your Goal</h2>
        <div className="goal-grid">
          {goals.map((g) => (
            <button
              type="button"
              key={g}
              className={`goal-btn ${goal === g ? "active" : ""}`}
              onClick={() => setGoal(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <button type="submit" className="btn-neon submit-btn" disabled={loading}>
          {loading ? "Uploading..." : "Continue to Dashboard"}
        </button>
      </form>
    </div>
  );
}