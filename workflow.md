## 🚀 Implementation Workflow (Strict Test-Driven Approach)

**CRITICAL DIRECTIVE FOR AGENT:** We do not write the entire application at once. We build step-by-step, starting directly with the Frontend. For every phase below, you must write the code, instruct the user on how to run it, and verify the test passes successfully. **Do not move to the next phase until the current phase is fully tested and confirmed working.**

### Phase 1: Minimalist Frontend UI (`/ai-clips`)
1.  **Action:** In the frontend project, build the layout using Tailwind CSS with a soft, clean, minimalist theme. Create the central prompt input box and the "Generate Video" button.
2.  **Action:** Implement React states to handle the dynamic loading indicator (e.g., setting up text transitions for "Scripting Storyboard..." -> "Generating Scene..." -> "Finalizing Video...").
3.  **Action:** Build the completion view containing the custom HTML5 video player and the auto-generated Instagram caption layout underneath it.
4.  **Test:** Create a mock submit function. When the user types a prompt and clicks generate, it should trigger the loading states sequentially, and then successfully display a sample placeholder video and caption on the screen. Verify the visual flow works perfectly in the browser before moving on.

### Phase 2: Infrastructure & Database (`/ai-clips-devops` & `/ai-clips-server`)
1.  **Action:** Create the `docker-compose.yml` for the PostgreSQL database inside the devops project.
2.  **Action:** Initialize Prisma in the server project and define the `User`, `Project`, and `Scene` schemas.
3.  **Test:** Boot the Docker container via Docker Desktop and run a simple backend script to verify the NestJS server connects to the database successfully.

### Phase 3: The Director / LLM Integration (`/ai-clips-server`)
1.  **Action:** Build the NestJS service that connects to the Google AI Studio Free API (Gemini).
2.  **Action:** Program the service to accept the prompt from Phase 1 and return a structured JSON array containing 3-4 distinct scenes with visual scripts and voiceover texts.
3.  **Test:** Trigger this service via Postman or terminal. Verify the backend console logs a perfectly structured JSON array.

### Phase 4: Visual Generation (`/ai-clips-server`)
1.  **Action:** Build a modular service connecting to the Google AI Studio Free API (Veo) to generate the silent video clips based on the JSON script. Ensure clips download to a local temporary server folder.
2.  **Test:** Run the service with a single mock scene description and verify an `.mp4` file successfully downloads to the server's temp directory.

### Phase 5: Audio & Video Assembly (`/ai-clips-server`)
1.  **Action:** Integrate a free Text-to-Speech provider to generate audio files from the script text.
2.  **Action:** Write the Node.js script using `ffmpeg` to concatenate the generated video clips, overlay the audio track, and export a final stitched `.mp4`.
3.  **Test:** Feed the script 3 dummy video clips and 1 dummy audio file. Verify `ffmpeg` successfully outputs one single, perfectly stitched video.
4.  **Final Test:** Connect the Phase 1 frontend directly to the backend and run a full end-to-end test.