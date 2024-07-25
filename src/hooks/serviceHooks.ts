export const postData = async (url: string, body: any) => {
    try {
        const token = localStorage.getItem('token');
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
  
  export const fetchData = async (url: string) => {
    try {
        const token = localStorage.getItem('token');
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