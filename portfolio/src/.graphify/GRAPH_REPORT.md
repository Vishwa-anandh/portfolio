# Graph Report - src  (2026-06-16)

## Corpus Check
- Corpus is ~35,881 words - fits in a single context window. You may not need a graph.

## Summary
- 109 nodes · 170 edges · 6 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 82 · imports_from: 48 · imports: 37 · calls: 3


## Input Scope
- Requested: auto
- Resolved: all (source: default-auto)
- Included files: 27 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed
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

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (2): ImageViewer(), ImageViewerProps

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (4): Background3D(), LetsTalk(), ToolsKnown(), PixelCanvas()

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (3): CaseStudySection, Project, projects

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (5): cn(), ButtonProps, LogoSvgProps, Pixel, PixelCanvasProps

### Community 4 - "Community 4"
Cohesion: 0.23
Nodes (11): Button, buttonVariants, hexToRgb(), HighlighterItem(), HighlighterItemProps, HighlightGroup(), HighlightGroupProps, MousePosition (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (1): ContainerScroll()

## Knowledge Gaps
- **10 isolated node(s):** `ImageViewerProps`, `ButtonProps`, `MousePosition`, `HighlightGroupProps`, `HighlighterItemProps` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 0`** (2 nodes): `ImageViewer()`, `ImageViewerProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (1 nodes): `ContainerScroll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Project` connect `Community 2` to `Community 0`, `Community 6`, `Community 5`, `Community 7`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `ImageViewer()` connect `Community 0` to `Community 6`, `Community 5`, `Community 7`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 3` to `Community 4`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `ImageViewerProps`, `ButtonProps`, `MousePosition` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1323529411764706 - nodes in this community are weakly interconnected._