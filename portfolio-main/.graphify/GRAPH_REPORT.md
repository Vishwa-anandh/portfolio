# Graph Report - .  (2026-06-15)

## Corpus Check
- Large corpus: 402 files ┬╖ ~16,32,314 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 111 nodes · 170 edges · 6 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 82 · imports_from: 48 · imports: 37 · calls: 3

## God Nodes (most connected - your core abstractions)
1. `Project` - 12 edges
2. `ImageViewer()` - 8 edges
3. `Background3D()` - 5 edges
4. `Particles()` - 4 edges
5. `projects` - 4 edges
6. `cn()` - 4 edges
7. `useMousePosition()` - 3 edges
8. `HighlightGroup()` - 3 edges
9. `LetsTalk()` - 2 edges
10. `ToolsKnown()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Core App UI"
Cohesion: 0.15
Nodes (4): Background3D(), LetsTalk(), ToolsKnown(), PixelCanvas()

### Community 1 - "Project Showcase"
Cohesion: 0.15
Nodes (3): CaseStudySection, Project, projects

### Community 2 - "UI Primitives & Utils"
Cohesion: 0.13
Nodes (5): cn(), ButtonProps, LogoSvgProps, Pixel, PixelCanvasProps

### Community 3 - "Highlighter & Interactions"
Cohesion: 0.23
Nodes (11): Button, buttonVariants, hexToRgb(), HighlighterItem(), HighlighterItemProps, HighlightGroup(), HighlightGroupProps, MousePosition (+3 more)

### Community 4 - "SEO Pro Case Study"
Cohesion: 0.25
Nodes (1): ContainerScroll()

### Community 11 - "Image Viewer Component"
Cohesion: 0.67
Nodes (2): ImageViewer(), ImageViewerProps

## Knowledge Gaps
- **10 isolated node(s):** `ImageViewerProps`, `ButtonProps`, `MousePosition`, `HighlightGroupProps`, `HighlighterItemProps` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `SEO Pro Case Study`** (1 nodes): `ContainerScroll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Viewer Component`** (2 nodes): `ImageViewer()`, `ImageViewerProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Project` connect `Project Showcase` to `Agentic14 Case Study`, `Educourse Case Study`, `Loop HR Case Study`, `P14 Case Study`, `SEO Pro Case Study`, `SmartyAir Case Study`, `Workflow AI Case Study`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `ImageViewer()` connect `Image Viewer Component` to `Agentic14 Case Study`, `Educourse Case Study`, `Loop HR Case Study`, `P14 Case Study`, `SEO Pro Case Study`, `SmartyAir Case Study`, `Workflow AI Case Study`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `cn()` connect `UI Primitives & Utils` to `Highlighter & Interactions`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `ImageViewerProps`, `ButtonProps`, `MousePosition` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Primitives & Utils` be split into smaller, more focused modules?**
  _Cohesion score 0.1323529411764706 - nodes in this community are weakly interconnected._