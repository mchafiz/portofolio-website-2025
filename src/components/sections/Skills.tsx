import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skills = {
    "Frontend": [
      "React", "Next.js", "TypeScript", "JavaScript", "Vue.js",
      "HTML5", "CSS3", "Tailwind CSS", "SCSS"
    ],
    "Backend": [
      "Node.js", "Express.js", "Python", "Django", "FastAPI",
      "PostgreSQL", "MongoDB", "Redis", "GraphQL"
    ],
    "Tools & Others": [
      "Git", "Docker", "AWS", "Vercel", "Figma",
      "Jest", "CI/CD", "Agile", "REST APIs"
    ]
  };

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-xl">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;