import { FormEvent, useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import diaryService
  from './services/diaryService';
import DiaryList from './components/DiaryList';
import DiaryAdd from './components/DiaryAdd';
import axios from 'axios';
function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [noty, setNoty] = useState<string>("");
  const [badNoty, setBadNoty] = useState<boolean>(false);

  useEffect(() => {
    diaryService.getAll()
      .then(response => {
        setDiaries(response);
      });

  }, []);

  const clearNotification = (): void => {
    setTimeout(() => {
      setNoty("")
    }, 3500);
  };

  const clearInputs = (inputs: HTMLFormElement): void => {
    inputs.date.value = "";
    inputs.visibility.value = "";
    inputs.weather.value = "";
    inputs.comment.value = "";
  }

  const submitEntry = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const elements = form.elements as HTMLFormControlsCollection;

      const dateInput = elements.namedItem("date") as HTMLInputElement;
      const visibilityInput = elements.namedItem("visibility") as HTMLInputElement;
      const weatherInput = elements.namedItem("weather") as HTMLInputElement;
      const commentInput = elements.namedItem("comment") as HTMLInputElement;

      if (!dateInput || !visibilityInput || !weatherInput || !commentInput) {
        setNoty("One or more inputs are missing.");
        clearNotification();
        clearInputs(form);
        return;
      }

      const newDiary = await diaryService.create({
        date: dateInput.value,
        visibility: visibilityInput.value,
        weather: weatherInput.value,
        comment: commentInput.value
      });
      setDiaries(diaries.concat(newDiary));
      setNoty("Successfully created new diary!");
      clearNotification();
      setBadNoty(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          const message = error.response.data.replace("Something went wrong. Error: ", "");
          console.error(message);
          setNoty(message);
          clearNotification();
          setBadNoty(true);
        }
      } else {
        const message = "Unknown error: " + error;
        console.error(message);
        setNoty(message);
        clearNotification();
        setBadNoty(true);
      }
    }
    finally {
      const form = event.target as HTMLFormElement;
      clearInputs(form);
    }
  }

  const notyStyle = {
    color: badNoty ? "red" : "green",
  };

  return (
    <>
      <h3 style={notyStyle}>{noty}</h3>
      <DiaryAdd onSubmit={submitEntry} />
      <h1>Diary entries</h1>
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
