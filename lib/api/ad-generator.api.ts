export interface GenerateAdParams {
  imageFile?: File | null;
  title: string;
  platform?: string;
  template?: string;
  customPrompt?: string;
  aspectRatio?: string;
  duration?: number;
}

export interface AdScriptScene {
  sceneNumber: number;
  prompt: string;
}

export interface GenerateAdResponse {
  success: boolean;
  title: string;
  platform?: string;
  template?: string;
  videoUrl: string;
  script?: AdScriptScene[];
  generatedClipUrls?: string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function generateProductAd(params: GenerateAdParams): Promise<GenerateAdResponse> {
  const formData = new FormData();

  if (params.imageFile) {
    formData.append('file', params.imageFile);
  }

  formData.append('title', params.title.trim());
  if (params.platform) formData.append('platform', params.platform);
  if (params.template) formData.append('template', params.template);
  if (params.customPrompt) formData.append('customPrompt', params.customPrompt.trim());
  if (params.aspectRatio) formData.append('aspectRatio', params.aspectRatio);
  if (params.duration) formData.append('duration', params.duration.toString());

  const response = await fetch(`${API_BASE_URL}/ad-generator/generate-ad`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API error (${response.status}): Failed to generate product ad`);
  }

  const data: GenerateAdResponse = await response.json();
  return data;
}
