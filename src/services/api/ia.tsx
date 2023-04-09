type GetIAImageProps = {
  prompt: string;
};

export const getIAImage = async ({ prompt }: GetIAImageProps) => {
  try {
    const params = new URLSearchParams({ prompt });
    const response = await fetch(
      `http://127.0.0.1:5000/?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data[0];
  } catch (err) {
    return false;
  }
};
