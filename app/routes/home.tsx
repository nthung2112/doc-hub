import type { Route } from "./+types/home";
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Code, Pyramid, ToolCase, Workflow } from 'lucide-react';
import { Link } from 'react-router';

import { baseOptions } from '@/lib/layout.shared';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DocHub Landing Page" },
    {
      name: "description",
      content: "Your central hub for documentation, tools, and code snippets.",
    },
  ];
}

interface Feature {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

const iconSize = 24;

const featuresData: Feature[] = [
  {
    id: 1,
    name: "Architecture Overview",
    description: "Detailed diagrams of our Java microservices and React mini apps.",
    icon: <Pyramid size={iconSize} />,
    href: "/docs",
  },
  {
    id: 2,
    name: "Process Flow Diagrams",
    description: "Visualizing the inner workings of our services and applications.",
    icon: <Workflow size={iconSize} />,
    href: "/docs/process-flows/introduction",
  },
  {
    id: 3,
    name: "Code Snippets",
    description: "Reusable code examples for common tasks and components.",
    icon: <Code size={iconSize} />,
    href: "/docs/code-snippets/getting-started",
  },
  {
    id: 4,
    name: "Internal Tool Directory",
    description: "A comprehensive directory of all internal tools and resources.",
    icon: <ToolCase size={iconSize} />,
    href: "/docs/internal-tools/tool-list",
  },
];

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col justify-center text-center flex-1 container mx-auto max-w-7xl px-6 grow">
        <section className="py-20 text-center">
          <div className="container">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Central Knowledge Hub
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Access architecture diagrams, flowcharts, code snippets, and internal tools all in one
              place.
            </p>
          </div>
        </section>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuresData.map((feature) => (
            <Link
              to={feature.href || "#"}
              key={feature.id}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 transition-transform scale-100 hover:scale-[102%] duration-300"
            >
              {feature.icon}
              <h3 className="mt-2 text-lg font-semibold">{feature.name}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
