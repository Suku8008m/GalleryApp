import { useState, useEffect } from "react";

export const useFetchPhotos = () => {
  const [data, setData] = useState({ photos: [], loading: true, error: null });

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=5&limit=30")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load photos");
        return res.json();
      })
      .then((json) => setData({ photos: json, loading: false, error: null }))
      .catch((err) =>
        setData({ photos: [], loading: false, error: err.message }),
      );
  }, []);

  return data;
};
