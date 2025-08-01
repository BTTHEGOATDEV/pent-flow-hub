import { useState } from "react";
import { FolderOpen, Plus, Search, MoreVertical, Calendar, Target, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import ProjectDialog from "@/components/ProjectDialog";

const Projects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Replace this with actual API call to fetch projects
  const projects: any[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      case "planning": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // This will be handled by the ProjectDialog component

  const handleProjectClick = (projectName: string) => {
    toast({
      title: "Opening Project",
      description: `Loading ${projectName} details...`,
    });
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                Projects
              </h1>
              <p className="text-muted-foreground">Manage your penetration testing projects</p>
            </div>
            <ProjectDialog>
              <Button variant="cyber" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </ProjectDialog>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? "No projects match your search criteria." : "Get started by creating your first project."}
                </p>
                <ProjectDialog>
                  <Button variant="cyber">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Project
                  </Button>
                </ProjectDialog>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="border-border/50 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg"
                  onClick={() => handleProjectClick(project.name)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-5 w-5 text-primary" />
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.client}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{project.targets} targets</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{project.team.length} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{project.lastScan}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Findings: {project.findings}</span>
                      <span>Created: {project.created}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;