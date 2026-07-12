# AI-Clips: Project Architecture & Agent Directives

## 🎯 Project Goal
Build an enterprise-grade AI video generation web application capable of producing multi-scene, narrated videos. The user inputs a single prompt, and the system autonomously scripts, generates, narrates, and edits a complete video. 

**Current Engine:** We are currently using the Google AI Studio Free API for all LLM and video generation tasks until a commercial budget is approved by the boss. The architecture must be modular so we can easily swap the API endpoints to Wan 2.7 or Kling 3.0 later.

## 🏗️ Strict Workspace Boundaries
This is a single VS Code Workspace containing 3 separate, distinct projects. **You must strictly adhere to these project boundaries. Do not mix code or create files outside of their designated project directories.**

### 1. Frontend Project (`/ai-clips`)
*   **Tech Stack:** Next.js, React, Tailwind CSS.
*   **Role:** Handles all User Interface and client-side logic.
*   **Design Rules:** 
    *   The UI must be heavily minimalist, clean, and professional (soft theme). Avoid fancy or cluttered themes. 
    *   **Main Interface:** A single, centered text area for the prompt and a "Generate Video" button. 
    *   **Dynamic Loading State:** Because multi-scene generation takes time, implement a real-time progress indicator mapping to backend statuses: (e.g., "Scripting Storyboard..." -> "Generating Scene 2 of 4..." -> "Rendering Audio..." -> "Finalizing Video...").
    *   **Completion View:** Display a custom HTML5 video player. Below the video, display an auto-generated, highly optimized Instagram caption and trending hashtags.

### 2. Backend Server Project (`/ai-clips-server`)
*   **Tech Stack:** NestJS, TypeScript, Prisma ORM, FFmpeg.
*   **Role:** Acts as the orchestration engine. 
*   **The 4-Step Production Pipeline (Crucial):**
    1.  **The Director (LLM):** Receive the user prompt. Send this to the Google AI Studio Free API (Gemini) to return a JSON array of 3-4 distinct scenes with visual descriptions and voiceover text.
    2.  **Visuals (Temporary Free API):** Iterate through the JSON array, sending the visual prompts to the Google AI Studio Free API (Veo video tier). Utilize Webhooks or a Polling Queue to track completion. 
    3.  **Audio (TTS):** Send the script text to a free audio provider to generate the voiceover `.mp3`.
    4.  **Assembly (FFmpeg):** Once all clips and audio are downloaded locally/to a temp folder, execute an `ffmpeg` command via Node.js to concatenate the video clips, overlay the audio track, and output the final `.mp4`.
    *   Upload the final video to a local or cloud storage directory and return the public URL to the frontend.

### 3. Database & DevOps Project (`/ai-clips-devops`)
*   **Tech Stack:** Docker Desktop, PostgreSQL.
*   **Role:** Infrastructure setup and database management.
*   **Design Rules:**
    *   Contains the `docker-compose.yml` for the database. **Crucial Requirement:** The Docker container running the NestJS server MUST have `ffmpeg` installed in its environment to handle the video stitching step.
    *   **Prisma Schema Requirements:** 
        *   `User`: Handle Google OAuth authentication tracking.
        *   `Project`: Tracks the overall video request.
        *   `Scene`: A one-to-many relationship with `Project` to track individual video clips before they are stitched.

## ⚠️ General Agent Rules
*   **Test-Driven Execution (CRITICAL):** Do not write the entire application or large blocks of code at once. When we implement any feature, we must first write it, run it, and test it to verify it works properly. *Only when it successfully passes testing do we move to the next task.*
*   Write clean, modular, and well-commented code. Follow NestJS dependency injection patterns strictly.
*   Ensure rigorous error handling. If a scene fails to generate, the pipeline must gracefully retry or alert the frontend, rather than crashing the entire FFmpeg process.
*   Ensure proper Cross-Origin Resource Sharing (CORS) between the frontend and server projects.