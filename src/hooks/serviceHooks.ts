export const postRequest = async (url: string) => {
  
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify()
    });

    const data = await res.json();

    if (!res.ok){
        let message;

        if (data?.message){
            message = data.message;
        } else {
            message = data;
        }

        return { Error: true, message}
    }
};