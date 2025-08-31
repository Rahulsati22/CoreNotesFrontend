// app/admin/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [docFile, setDocFile] = useState(null);
  const [docPreview, setDocPreview] = useState(''); // blob URL only for PDFs

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
      if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
    };
  }, [imagePreview, docPreview]);

  const isDisabled = useMemo(() => saving || !title.trim() || !branch.trim(), [saving, title, branch]);

  // Type guards
  const isFile = (v) => typeof File !== 'undefined' && v instanceof File;
  const isImage = (f) => isFile(f) && /^image\//.test(f.type);
  const isDoc = (f) =>
    isFile(f) &&
    /^(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/i.test(
      f.type
    );

  const onImageChange = (e) => {
    try {
      const file = e?.target?.files?.[0] || null; // ✅ pick first file

      if (!file) {
        if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview('');
        return;
      }

      if (!isImage(file)) {
        if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview('');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        setImagePreview(result);
      };
      reader.onerror = () => setImagePreview('');
      reader.readAsDataURL(file);
    } catch {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const onDocChange = (e) => {
    try {
      const file = e?.target?.files?.[0] || null; // ✅ pick first file

      if (!file) {
        if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
        setDocFile(null);
        setDocPreview('');
        return;
      }

      if (!isDoc(file)) {
        if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
        setDocFile(null);
        setDocPreview('');
        return;
      }

      setDocFile(file);

      if (file.type === 'application/pdf') {
        const objectUrl = URL.createObjectURL(file);
        setDocPreview((prev) => {
          if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
          return objectUrl;
        });
      } else {
        if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
        setDocPreview('');
      }
    } catch {
      setDocFile(null);
      setDocPreview('');
    }
  };

  // Optional drag-and-drop support
  const onDrop = (ev) => {
    ev.preventDefault();
    const file = ev.dataTransfer?.files?.[0] || null;
    if (!file) return;

    if (isImage(file)) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    } else if (isDoc(file)) {
      setDocFile(file);
      if (file.type === 'application/pdf') {
        const objectUrl = URL.createObjectURL(file);
        setDocPreview((prev) => {
          if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
          return objectUrl;
        });
      } else {
        if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
        setDocPreview('');
      }
    }
  };
  const onDragOver = (ev) => ev.preventDefault();

  const validate = () => {
    const next = {};
    if (!title.trim()) next.title = 'Course name is required';
    if (!branch.trim()) next.branch = 'Branch is required';
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('title', title.trim());
      fd.append('branch', branch.trim());
      if (imageFile) fd.append('image', imageFile);
      if (docFile) fd.append('file', docFile);

      // TODO: send to your backend
      // const res = await fetch('/api/admin/courses', { method: 'POST', body: fd });
      // if (!res.ok) throw new Error('Failed to save');

      await new Promise((r) => setTimeout(r, 700)); // demo delay
      setMsg('Course saved. You can now publish or add more details.');

      // Reset
      setTitle('');
      setBranch('');
      setImageFile(null);
      setDocFile(null);

      if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
      setImagePreview('');

      if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
      setDocPreview('');

      setErrors({});
    } catch (err) {
      setMsg(err?.message || 'Something went wrong while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Admin: Create Course</h1>
        <p className="text-sm text-gray-600 mt-1">
          Add a course with its branch, cover image, and an attachment (PDF/doc).
        </p>
      </header>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-medium">Course details</h2>
        </div>

        <form onSubmit={submit} className="px-6 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">Course name</label>
              <input
                className={`w-full rounded-md border p-2.5 outline-none transition focus:ring-2 ${
                  errors.title ? 'border-red-400 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="e.g., Data Structures"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title ? (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Use a concise, searchable title.</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">Branch</label>
              <input
                className={`w-full rounded-md border p-2.5 outline-none transition focus:ring-2 ${
                  errors.branch ? 'border-red-400 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="e.g., CSE, ECE"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
              {errors.branch ? (
                <p className="mt-1 text-xs text-red-600">{errors.branch}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Enter the course’s department/branch.</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="mb-2 block text-sm font-medium text-gray-700">Course image</label>
              <div
                className="rounded-md border border-dashed border-gray-300 p-4 hover:bg-gray-50"
                onDrop={onDrop}
                onDragOver={onDragOver}
              >
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50">
                    <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
                    Choose image
                  </label>
                  {imageFile ? (
                    <span className="rounded bg-green-50 px-2 py-1 text-xs text-green-700">{imageFile.name}</span>
                  ) : (
                    <span className="text-xs text-gray-500">PNG, JPG up to ~4MB • or drag and drop</span>
                  )}
                </div>

                {imagePreview ? (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-28 w-28 rounded-md border object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-span-1">
              <label className="mb-2 block text-sm font-medium text-gray-700">Course file</label>
              <div className="rounded-md border border-dashed border-gray-300 p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50">
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onDocChange} />
                    Choose file
                  </label>
                  {docFile ? (
                    <span className="max-w-[260px] truncate rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-700">
                      {docFile.name}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">PDF/DOC up to ~20MB</span>
                  )}
                </div>

                {docPreview ? (
                  <div className="mt-3">
                    <a
                      href={docPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      Preview PDF in new tab
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="submit"
              disabled={isDisabled}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Create course'
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle('');
                setBranch('');
                setImageFile(null);
                setDocFile(null);

                if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
                setImagePreview('');

                if (docPreview && docPreview.startsWith('blob:')) URL.revokeObjectURL(docPreview);
                setDocPreview('');

                setErrors({});
                setMsg('');
              }}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Reset
            </button>

            {msg ? <span className="text-sm text-gray-700">{msg}</span> : null}
          </div>
        </form>
      </section>
    </main>
  );
}
