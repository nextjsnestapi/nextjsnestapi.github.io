export type ReasonIcon = 'shield' | 'shapes' | 'list' | 'layers' | 'docSync' | 'terminal';

export interface ComparisonReason {
  title: string;
  description: string;
  icon: ReasonIcon;
}

export interface ComparisonData {
  title: string;
  description: string;
  reasons: ComparisonReason[];
}

export const validationComparison: ComparisonData = {
  title: 'Why nextjs-nestapi?',
  description:
    "Plain Next.js route handlers are just functions — no ceremony, straight to the Web APIs. That's exactly where the pain starts once an API grows past a few endpoints: validation gets hand-rolled per route, error shapes drift, and there's no single place that lists what your API actually exposes.",
  reasons: [
    {
      icon: 'shield',
      title: 'Validation, built in',
      description:
        '@Body(DtoClass) validates the request body against your class-validator decorators before the handler ever runs — no hand-rolled if checks, no field quietly left unvalidated. The same decorated method validates just as well when bound and called as a Next.js Server Action.',
    },
    {
      icon: 'shapes',
      title: 'One error shape, always',
      description:
        "Every validation failure returns the same structured response. Nothing to remember, nothing to retype slightly differently in the next route.",
    },
    {
      icon: 'list',
      title: 'Routes you can actually see',
      description:
        'Routes are the @Get/@Post decorators on a controller class — read one file to know what an API exposes, instead of browsing a folder tree.',
    },
    {
      icon: 'layers',
      title: 'No framework tax',
      description:
        "Still the same NextRequest/NextResponse Next.js already gives you. nextjs-nestapi organizes the API — it doesn't replace anything underneath it.",
    },
    {
      icon: 'docSync',
      title: "Docs that can't drift",
      description:
        '@ApiTags/@ApiOperation and generateOpenApiDocument() build the OpenAPI spec from the same decorators the route already needs — no separate file to keep in sync.',
    },
    {
      icon: 'terminal',
      title: 'One command to start',
      description:
        'npx nextjs-nestapi new/init/generate scaffolds the wiring and the boilerplate — you write the controller, not the plumbing around it.',
    },
  ],
};
