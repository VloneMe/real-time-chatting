"use client"

export const serviceHooks = () => {

  const token = localStorage.getItem('token');
  
  const postData = async (url: string, body: any) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        const message = data?.message || data;
        return { error: true, message };
      }
  
      return data;
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  };
  
  const fetchData = async (url: string) => {
    try {
      const res = await fetch(url, {
        headers: {
          "Authorization": `${token}`,  
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        const message = data?.message || data;
        return { error: true, message };
      }
  
      return data;
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  };

  return { postData, fetchData}
}