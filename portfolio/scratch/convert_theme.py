import os
import glob

# Find all case study files
files = glob.glob(r"f:\remix_-portfolio-2\portfolio\src\*CaseStudy.tsx")
files.append(r"f:\remix_-portfolio-2\portfolio\src\ProjectDetail.tsx")

replacements = {
    "bg-[#fdfdfd]/80": "bg-neutral-950/80",
    "text-black/80": "text-white/80",
    "border-black/5": "border-white/5",
    "border-black/10": "border-white/10",
    "border-black/20": "border-white/20",
    "text-black": "text-white",
    "text-black/60": "text-white/60",
    "text-black/50": "text-white/50",
    "text-black/70": "text-white/70",
    "bg-indigo-50": "bg-indigo-500/10",
    "bg-red-50": "bg-red-500/10",
    "bg-emerald-50": "bg-emerald-500/10",
    "bg-blue-50": "bg-blue-500/10",
    "bg-purple-50": "bg-purple-500/10",
    "text-indigo-600": "text-indigo-400",
    "text-red-600": "text-red-400",
    "text-emerald-600": "text-emerald-400",
    "text-blue-600": "text-blue-400",
    "text-purple-600": "text-purple-400",
    "from-black": "from-white",
    "via-neutral-800": "via-neutral-200",
    "to-neutral-500": "to-neutral-400",
    "bg-black/5": "bg-white/5",
    "bg-white": "bg-neutral-900",
    "bg-neutral-50": "bg-neutral-800/50",
    "bg-neutral-100": "bg-neutral-900",
    "hover:bg-neutral-50": "hover:bg-neutral-800",
    "hover:border-black/20": "hover:border-white/20",
    "bg-white/10": "bg-white/10", # leave as is
    "text-indigo-200": "text-indigo-800",
    "border-indigo-200": "border-indigo-800",
}

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    for old, new in replacements.items():
        content = content.replace(old, new)

    # Fix a few things that might have been accidentally double replaced or inverted incorrectly
    content = content.replace("bg-neutral-900 shadow-lg", "bg-neutral-900 shadow-lg shadow-black/50")
    content = content.replace("shadow-xl", "shadow-xl shadow-black/50")
    content = content.replace("shadow-2xl", "shadow-2xl shadow-black/50")
    
    # Avoid messing up existing valid strings
    content = content.replace("text-white/50 mb-2 font-mono flex items-center gap-2", "text-white/50 mb-2 font-mono flex items-center gap-2")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Replacement complete for {len(files)} files.")
