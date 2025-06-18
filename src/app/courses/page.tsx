
// src/app/courses/page.tsx
"use client";

import type React from 'react';
import Image from 'next/image';
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, HelpCircle, Users, TrendingUp, Palette, Briefcase, ListChecks, Brain, Sparkles, BarChart3, Settings, ShieldCheck, MessageSquare } from "lucide-react";
import type { Course, CourseListingItem, CourseLevel } from "@/types";
import { cn } from '@/lib/utils';

// Placeholder Data (to be replaced with API calls)
const coursesData: Course[] = [
  {
    id: "course1",
    title: "UI Styleguide With Figma",
    imageUrl: "https://placehold.co/600x400.png",
    level: "Intermediate",
    authorName: "Jonathan Due",
    authorAvatarUrl: "https://placehold.co/32x32.png",
    lessonsCount: 24,
    quizCount: 9,
    studentCount: 30,
    progressPercent: 45,
    daysRemaining: "4/12",
    imageHint: "design abstract"
  },
  {
    id: "course2",
    title: "Interaction Design With Figma",
    imageUrl: "https://placehold.co/600x400.png",
    level: "Beginner",
    authorName: "Killan James",
    authorAvatarUrl: "https://placehold.co/32x32.png",
    lessonsCount: 24,
    quizCount: 9,
    studentCount: 30,
    progressPercent: 75,
    daysRemaining: "4/12",
    imageHint: "ui ux"
  },
  {
    id: "course3",
    title: "3D Illustration Design With Figma",
    imageUrl: "https://placehold.co/600x400.png",
    level: "Intermediate",
    authorName: "Jonathan Due",
    authorAvatarUrl: "https://placehold.co/32x32.png",
    lessonsCount: 24,
    quizCount: 9,
    studentCount: 30,
    progressPercent: 65,
    daysRemaining: "4/12",
    imageHint: "3d illustration"
  },
  {
    id: "course4",
    title: "Web App Design With Figma",
    imageUrl: "https://placehold.co/600x400.png",
    level: "Master",
    authorName: "Jonathan Due",
    authorAvatarUrl: "https://placehold.co/32x32.png",
    lessonsCount: 24,
    quizCount: 9,
    studentCount: 30,
    progressPercent: 25,
    daysRemaining: "4/12",
    imageHint: "web design"
  },
];

const courseListingData: CourseListingItem[] = [
  { id: "cl1", name: "3D Animation", category: "UI Design", level: "Beginner", tools: "Cinema 4D", lessonsDescription: "25 tutorials", pointsRequired: 100 },
  { id: "cl2", name: "Design Thinking", category: "UX Design", level: "Intermediate", tools: "Adobe XD", lessonsDescription: "25 tutorials", pointsRequired: 100 },
  { id: "cl3", name: "Matching Learning", category: "Data Learn", level: "Advanced", tools: "VS Code", lessonsDescription: "25 tutorials", pointsRequired: 100 },
  { id: "cl4", name: "Responsive Design", category: "UI Design", level: "Beginner", tools: "Figma", lessonsDescription: "25 tutorials", pointsRequired: 100 },
];

const getLevelBadgeClass = (level: CourseLevel): string => {
  switch (level) {
    case "Beginner":
      return "bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-500/30 dark:text-green-300";
    case "Intermediate":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:bg-yellow-500/30 dark:text-yellow-300";
    case "Advanced":
      return "bg-blue-500/20 text-blue-700 border-blue-500/30 dark:bg-blue-500/30 dark:text-blue-300";
    case "Master":
      return "bg-purple-500/20 text-purple-700 border-purple-500/30 dark:bg-purple-500/30 dark:text-purple-300";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const LevelIcon = ({ level }: { level: CourseLevel }) => {
  let IconComponent;
  let colorClass = "";

  switch (level) {
    case "Beginner":
      IconComponent = TrendingUp; // Or a more specific "beginner" icon if available
      colorClass = "text-green-600 dark:text-green-400";
      break;
    case "Intermediate":
      IconComponent = BarChart3; // Using BarChart3 for Intermediate
      colorClass = "text-yellow-600 dark:text-yellow-400";
      break;
    case "Advanced":
      IconComponent = Sparkles; // Using Sparkles for Advanced
      colorClass = "text-blue-600 dark:text-blue-400";
      break;
    case "Master":
      IconComponent = ShieldCheck; // Using ShieldCheck for Master
      colorClass = "text-purple-600 dark:text-purple-400";
      break;
    default:
      IconComponent = HelpCircle;
      colorClass = "text-muted-foreground";
  }
  return <IconComponent className={cn("h-4 w-4 mr-1", colorClass)} />;
};


export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-8 md:py-12">
        <Container>
          <section className="mb-12 animate-fadeIn opacity-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Course</h1>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:max-w-md mb-6 bg-muted p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md py-1.5 text-sm font-medium">All</TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md py-1.5 text-sm font-medium">Active</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md py-1.5 text-sm font-medium">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {coursesData.map((course, index) => (
                    <Card 
                      key={course.id} 
                      className="bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out hover:scale-103 hover:shadow-xl animate-fadeIn opacity-0"
                      style={{ animationDelay: `${index * 100 + 200}ms` }}
                    >
                      <div className="relative w-full h-48">
                        <Image src={course.imageUrl} alt={course.title} layout="fill" objectFit="cover" data-ai-hint={course.imageHint}/>
                        <Badge className={cn("absolute top-3 left-3 text-xs py-1 px-2", getLevelBadgeClass(course.level))}>
                          {course.level}
                        </Badge>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold line-clamp-2">{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={course.authorAvatarUrl} alt={course.authorName} />
                            <AvatarFallback>{course.authorName.substring(0,1)}</AvatarFallback>
                          </Avatar>
                          <span>{course.authorName}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" /> {course.lessonsCount}
                          </div>
                          <div className="flex items-center gap-1">
                            <HelpCircle className="h-3.5 w-3.5" /> {course.quizCount}
                          </div>
                           <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {course.studentCount}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start gap-2 pt-3 border-t">
                        <Progress value={course.progressPercent} className="w-full h-2 rounded-full" />
                        <div className="flex justify-between w-full text-xs text-muted-foreground">
                          <span>Completed: {course.progressPercent}%</span>
                          <span>Days: {course.daysRemaining}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="active">
                <p className="text-muted-foreground text-center py-8">No active courses to display yet.</p>
              </TabsContent>
              <TabsContent value="completed">
                 <p className="text-muted-foreground text-center py-8">No completed courses to display yet.</p>
              </TabsContent>
            </Tabs>
          </section>

          <section className="animate-fadeIn opacity-0" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Course Listing</h2>
            <Card className="shadow-lg rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] text-muted-foreground font-semibold">Name</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Category</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Level</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Tools</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Lessons</TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">Points required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseListingData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className="animate-fadeIn opacity-0 hover:bg-muted/50 transition-colors"
                      style={{ animationDelay: `${index * 50 + 700}ms` }}
                    >
                      <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                      <TableCell className="text-muted-foreground">{item.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs py-1 px-2 flex items-center w-fit", getLevelBadgeClass(item.level))}>
                           <LevelIcon level={item.level} />
                           {item.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.tools}</TableCell>
                      <TableCell className="text-muted-foreground">{item.lessonsDescription}</TableCell>
                      <TableCell className="text-right font-medium text-primary">{item.pointsRequired} points</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>
        </Container>
      </main>
      <footer className="py-8 mt-12 border-t border-border/50 animate-fadeIn opacity-0" style={{ animationDelay: '800ms' }}>
        <Container className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
          <p className="mt-1">Empowering your learning journey.</p>
        </Container>
      </footer>
    </div>
  );
}
