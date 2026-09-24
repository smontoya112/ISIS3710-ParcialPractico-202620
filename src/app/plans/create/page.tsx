"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createPlan } from "@/services/plans";
import { getSession } from "@/services/session";

const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-4 outline-none";

export default function CreatePlanPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Hay que guardar el formulario ANTES de cualquier await:
    // después de un await, event.currentTarget ya es null
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const image = String(form.get("image") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const price = Number(form.get("price"));
    const duration = String(form.get("duration") ?? "").trim();
    const recommendations = String(form.get("recommendations") ?? "").trim();

    // Validaciones del formulario
    const validationErrors: string[] = [];

    if (name.length < 2 || name.length > 50) {
      validationErrors.push("El nombre debe tener entre 2 y 50 caracteres.");
    }
    if (!Number.isFinite(price) || price <= 0) {
      validationErrors.push("El precio estimado debe ser mayor a 0.");
    }
    if (!/^\d+$/.test(duration)) {
      validationErrors.push("La duración debe ser un número entero.");
    }
    if (description.length >= 600) {
      validationErrors.push("La descripción debe tener menos de 600 caracteres.");
    }

    // El plan se crea a nombre del usuario que inició sesión
    const { id: userId } = getSession();
    if (!userId) {
      validationErrors.push("Debes iniciar sesión para crear un plan.");
    }

    setErrors(validationErrors);
    if (validationErrors.length > 0 || !userId) {
      return;
    }

    // Conexión con el back: POST /plans
    setLoading(true);
    try {
      await createPlan({
        name,
        description,
        estimatedPrice: price,
        estimatedTime: Number(duration),
        address,
        image,
        recomendations: recommendations,
      });

      formElement.reset();
      router.push("/plans");
    } catch (err) {
      setErrors(["No se pudo crear el plan, intenta de nuevo."]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 py-10">
      <h1 className="text-5xl font-bold text-slate-900">Crear plan</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 mt-10 w-full max-w-md"
      >
        <input
          name="image"
          type="url"
          placeholder="Link de la imagen del plan"
          className={inputClass}
        />
        <input
          name="name"
          type="text"
          placeholder="Nombre del plan"
          required
          className={inputClass}
        />
        <input
          name="address"
          type="text"
          placeholder="Dirección del plan"
          className={inputClass}
        />
        <textarea
          name="description"
          placeholder="Descripción del plan"
          required
          className={inputClass}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio estimado"
          min="0.01"
          step="0.01"
          required
          className={inputClass}
        />
        <input
          name="duration"
          type="text"
          placeholder="Duración estimada (minutos)"
          inputMode="numeric"
          required
          className={inputClass}
        />
        <textarea
          name="recommendations"
          placeholder="Recomendaciones (opcional)"
          className={inputClass}
        />

        {errors.length > 0 && (
          <ul role="alert" className="text-sm text-red-600 mt-4">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear plan"}
          </button>
          <button
            type="reset"
            onClick={() => setErrors([])}
            className="text-slate-600 font-semibold px-4"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}