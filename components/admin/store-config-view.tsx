export interface StoreConfigViewProps {
    config?: any;
    isPending: boolean;
    error: string | null;
    logoPreview: string | null;
    keptHeroImages: string[];
    heroPreviews: string[];
    handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeroImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeHeroExisting: (index: number) => void;
    removeHeroNew: (index: number) => void;
}

export function StoreConfigView({
    config,
    isPending,
    error,
    logoPreview,
    keptHeroImages,
    heroPreviews,
    handleLogoChange,
    handleHeroImagesChange,
    removeHeroExisting,
    removeHeroNew
}: StoreConfigViewProps) {
    return (
        <div className="flex flex-col gap-8 pb-20">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-gray-900">Personalización de Tienda</h1>
                <p className="text-gray-500">Configura la identidad visual y datos de contacto.</p>
            </div>

            {/* IDENTITY */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-lg font-bold border-b pb-2">Identidad</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">Nombre de la Tienda</span>
                        <input name="storeName" defaultValue={config?.storeName} required
                            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-black focus:border-black" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">Descripción (SEO)</span>
                        <input name="description" defaultValue={config?.description} required
                            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-black focus:border-black" />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Input */}
                    <div>
                        <span className="text-sm font-bold text-gray-700 block mb-2">Logo</span>
                        <div className="flex items-start gap-4">
                            {logoPreview ? (
                                <div className="relative w-24 h-24 bg-gray-50 rounded-lg border overflow-hidden flex items-center justify-center">
                                    <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                                    <input type="hidden" name="keptLogo" value={logoPreview} />
                                </div>
                            ) : (
                                <div className="w-24 h-24 bg-gray-100 rounded-lg border border-dashed flex items-center justify-center text-gray-400">
                                    <span className="material-symbols-outlined">image</span>
                                </div>
                            )}
                            <div className="flex-1">
                                <input type="file" accept="image/*" onChange={handleLogoChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                                <p className="text-xs text-gray-400 mt-2">Recomendado: PNG Transparente 200x200px</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HERO SETTINGS */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-lg font-bold border-b pb-2">Sección Principal (Hero)</h2>

                <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">Título Principal</span>
                        <input name="heroTitle" defaultValue={config?.heroTitle}
                            className="mt-1 w-full rounded-lg border-gray-300" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">Subtítulo</span>
                        <input name="heroSubtitle" defaultValue={config?.heroSubtitle}
                            className="mt-1 w-full rounded-lg border-gray-300" />
                    </label>

                    {/* Hero Images */}
                    <div>
                        <span className="text-sm font-bold text-gray-700 block mb-2">Imágenes del Carrusel</span>
                        <input type="hidden" name="keptHeroImages" value={JSON.stringify(keptHeroImages)} />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {keptHeroImages.map((src, idx) => (
                                <div key={`kept-${idx}`} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => removeHeroExisting(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                            {heroPreviews.map((src, idx) => (
                                <div key={`new-${idx}`} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-blue-200">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => removeHeroNew(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                            <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black aspect-square">
                                <span className="material-symbols-outlined text-gray-400">add_photo_alternate</span>
                                <span className="text-xs text-gray-500 mt-2">Agregar</span>
                                <input type="file" multiple accept="image/*" onChange={handleHeroImagesChange} className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-lg font-bold border-b pb-2">Contacto y Redes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">Email de Contacto</span>
                        <input name="contactEmail" type="email" defaultValue={config?.contactEmail || ''}
                            className="mt-1 w-full rounded-lg border-gray-300" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">Teléfono</span>
                        <input name="contactPhone" defaultValue={config?.contactPhone || ''}
                            className="mt-1 w-full rounded-lg border-gray-300" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-gray-700">WhatsApp (Número Completo)</span>
                        <input name="whatsappNumber" defaultValue={config?.whatsappNumber || ''} placeholder="54911..."
                            className="mt-1 w-full rounded-lg border-gray-300" />
                    </label>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="block">
                            <span className="text-sm font-bold text-gray-700">Instagram URL</span>
                            <input name="instagramUrl" defaultValue={config?.instagramUrl || ''}
                                className="mt-1 w-full rounded-lg border-gray-300" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-gray-700">Facebook URL</span>
                            <input name="facebookUrl" defaultValue={config?.facebookUrl || ''}
                                className="mt-1 w-full rounded-lg border-gray-300" />
                        </label>
                    </div>
                </div>
            </section>

            <div className="flex justify-end pt-6">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                    {isPending ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </div>
    );
}
