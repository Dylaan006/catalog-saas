'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StoreConfigView } from './store-config-view';


export interface StoreConfig {
    id: number;
    storeName: string;
    description: string;
    logoUrl: string | null;
    heroTitle: string;
    heroSubtitle: string;
    heroImageUrls: string;
    contactEmail: string | null;
    contactPhone: string | null;
    whatsappNumber: string | null;
    instagramUrl: string | null;
    facebookUrl: string | null;
    updatedAt: Date;
}

interface StoreConfigFormProps {
    config?: StoreConfig | null;
    action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export function StoreConfigForm({ config, action }: StoreConfigFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- LOGO STATE ---
    const [logoPreview, setLogoPreview] = useState<string | null>(config?.logoUrl || null);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    // --- HERO IMAGES STATE ---
    const initialHeroImages = config?.heroImageUrls ? JSON.parse(config.heroImageUrls) : [];
    const [keptHeroImages, setKeptHeroImages] = useState<string[]>(Array.isArray(initialHeroImages) ? initialHeroImages : []);
    const [heroPreviews, setHeroPreviews] = useState<string[]>([]);
    const [heroFiles, setHeroFiles] = useState<File[]>([]);

    // --- HANDLERS ---

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleHeroImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setHeroFiles(prev => [...prev, ...newFiles]);
            setHeroPreviews(prev => [...prev, ...newFiles.map(f => URL.createObjectURL(f))]);
        }
        e.target.value = ''; // Reset
    };

    const removeHeroNew = (index: number) => {
        setHeroFiles(prev => prev.filter((_, i) => i !== index));
        setHeroPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeHeroExisting = (index: number) => {
        setKeptHeroImages(prev => prev.filter((_, i) => i !== index));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        // Append custom files
        if (logoFile) formData.append('logo', logoFile);
        heroFiles.forEach(f => formData.append('heroImages', f));

        try {
            const result = await action(formData);
            if (result.success) {
                router.refresh(); // Refresh server components to pick up new config
                router.push('/admin'); // Or stay? existing logic redirects
            } else {
                setError(result.error || 'Error desconocido');
            }
        } catch (e) {
            setError('Error al conectar con el servidor');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
            <StoreConfigView
                config={config}
                isPending={isPending}
                error={error}
                logoPreview={logoPreview}
                keptHeroImages={keptHeroImages}
                heroPreviews={heroPreviews}
                handleLogoChange={handleLogoChange}
                handleHeroImagesChange={handleHeroImagesChange}
                removeHeroExisting={removeHeroExisting}
                removeHeroNew={removeHeroNew}
            />
        </form>
    );
}
